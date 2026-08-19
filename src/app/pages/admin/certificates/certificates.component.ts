import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminShellComponent } from '../../../layout/admin-shell/admin-shell.component';
import { CertificateService } from '../../../core/services/certificate.service';
import { Certificate, CertificateRequest } from '../../../core/models/certificate.model';

@Component({
    selector: 'app-certificates',
    standalone: true,
    imports: [CommonModule, FormsModule, AdminShellComponent],
    templateUrl: './certificates.component.html',
    styleUrl: './certificates.component.scss',
})
export class CertificatesComponent implements OnInit {
    certificates = signal<Certificate[]>([]);
    editingId: number | null = null;
    form: CertificateRequest = this.emptyForm();

    constructor(private certificateService: CertificateService) { }

    ngOnInit(): void {
        this.loadCertificates();
    }

    loadCertificates(): void {
        this.certificateService.getAll().subscribe((data) => this.certificates.set(data));
    }

    emptyForm(): CertificateRequest {
        return { name: '', issuer: '', issueDate: '', credentialUrl: '' };
    }

    onEdit(cert: Certificate): void {
        this.editingId = cert.id;
        this.form = {
            name: cert.name,
            issuer: cert.issuer,
            issueDate: cert.issueDate,
            credentialUrl: cert.credentialUrl,
        };
    }

    onCancelEdit(): void {
        this.editingId = null;
        this.form = this.emptyForm();
    }

    onSubmit(): void {
        const request = this.editingId
            ? this.certificateService.update(this.editingId, this.form)
            : this.certificateService.create(this.form);

        request.subscribe(() => {
            this.loadCertificates();
            this.onCancelEdit();
        });
    }

    onDelete(id: number): void {
        if (!confirm('Supprimer ce certificat ?')) return;
        this.certificateService.delete(id).subscribe(() => this.loadCertificates());
    }
}