import { getFirebaseBucket, isFirebaseReady } from "../config/firebase.js";

/**
 * @desc    Upload blueprint image (Firebase Storage or base64 fallback)
 * @route   POST /api/upload/blueprint
 * @access  Optional Auth
 */
export const uploadBlueprint = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file provided for upload." });
    }

    const file = req.file;
    const bucket = getFirebaseBucket();

    // If Firebase Storage is active, upload to bucket
    if (bucket && isFirebaseReady()) {
      const fileName = `blueprints/${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "")}`;
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on("error", (err) => {
        console.error("Firebase Storage error:", err);
        // Fallback to data url
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        res.json({
          success: true,
          message: "Uploaded as data URL (Storage fallback).",
          url: base64,
          fileName: file.originalname,
        });
      });

      blobStream.on("finish", async () => {
        await blob.makePublic().catch(() => {});
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(201).json({
          success: true,
          message: "Blueprint uploaded to Firebase Storage successfully.",
          url: publicUrl,
          fileName: file.originalname,
        });
      });

      blobStream.end(file.buffer);
      return;
    }

    // Dev / Local fallback: Return base64 data URL
    const base64Url = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    res.status(201).json({
      success: true,
      message: "Blueprint uploaded (data URL format).",
      url: base64Url,
      fileName: file.originalname,
      sizeBytes: file.size,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Blueprint upload failed.",
      error: error.message,
    });
  }
};

/**
 * @desc    Upload interior space photograph or render
 * @route   POST /api/upload/interior
 * @access  Optional Auth
 */
export const uploadInteriorImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided." });
    }

    const file = req.file;
    const bucket = getFirebaseBucket();

    if (bucket && isFirebaseReady()) {
      const fileName = `interiors/${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "")}`;
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: { contentType: file.mimetype },
      });

      blobStream.on("error", (err) => {
        console.error("Firebase Storage error:", err);
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        res.json({ success: true, url: base64, fileName: file.originalname });
      });

      blobStream.on("finish", async () => {
        await blob.makePublic().catch(() => {});
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(201).json({
          success: true,
          message: "Interior image uploaded to Firebase Storage.",
          url: publicUrl,
        });
      });

      blobStream.end(file.buffer);
      return;
    }

    const base64Url = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    res.status(201).json({
      success: true,
      message: "Image uploaded (data URL format).",
      url: base64Url,
      fileName: file.originalname,
      sizeBytes: file.size,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default { uploadBlueprint, uploadInteriorImage };
