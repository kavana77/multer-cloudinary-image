// imageResize.js
import sharp from "sharp";
import path from "path";

export const imageResize = async (req, res, next) => {
    try {
        const originalFilePath = req.files[0].path;
        const parsedPath = path.parse(originalFilePath);
        const outputFilePath = path.join(parsedPath.dir, "resized-" + parsedPath.name + ".jpeg");
        
        await sharp(originalFilePath).resize({ width: 1500 }).jpeg({
            quality: 100,
            mozjpeg: true,
            chromaSubsampling: "4:4:4",
            trellisQuantisation: true,
            overshootDeringing: true,
            optimiseScans: true,
            progressive: true
        }).toFile(outputFilePath);

        req.files[0].path = outputFilePath;
    } catch (error) {
        return res.status(500).json({ error: { description: error.message } });
    }
};
