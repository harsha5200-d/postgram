const ImageKit = require('@imagekit/nodejs');

// Try with the user's key if possible, but I don't have the value in my context except what I saw in .env
const privateKey = "private_f7CiIC2g6l+Nd/7iOtr/rRz7trI="; 

const imagekit = new ImageKit({
    privateKey: privateKey
});

async function testUpload() {
    try {
        console.log("Attempting upload...");
        const result = await imagekit.files.upload({
            file: Buffer.from("test").toString('base64'),
            fileName: "test.jpg"
        });
        console.log("Upload Success:", result.url);
    } catch (e) {
        console.error("Upload Failed:", e.message);
    }
}

testUpload();
