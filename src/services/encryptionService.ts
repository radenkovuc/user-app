import crypto from 'crypto';

const algorithm = 'aes-256-ctr';

export function decrypt(hash: string): string {
    const [ivHex, encryptedTextHex, keyHex] = hash.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedTextHex, 'hex');
    const key = Buffer.from(keyHex, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final()
    ]);

    return decrypted.toString();
}
