export interface Certificate {
    id: number;
    name: string;
    issuer: string;
    issueDate: string;
    credentialUrl: string;
}

export interface CertificateRequest {
    name: string;
    issuer: string;
    issueDate: string;
    credentialUrl: string;
}