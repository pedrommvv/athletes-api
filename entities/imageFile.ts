export class ImageFile {
    mimeType: String
    content: Buffer

    constructor(mimeType: String, content: Buffer) {
        this.mimeType = mimeType
        this.content = content
    }
}