import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminShellComponent } from '../../../layout/admin-shell/admin-shell.component';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../../core/models/contact.model';

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [CommonModule, AdminShellComponent],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.scss',
})
export class MessagesComponent implements OnInit {
    messages = signal<Contact[]>([]);

    constructor(private contactService: ContactService) { }

    ngOnInit(): void { this.loadMessages(); }

    loadMessages(): void {
        this.contactService.getAll().subscribe((data) => this.messages.set(data));
    }

    onMarkAsRead(id: number): void {
        this.contactService.markAsRead(id).subscribe(() => this.loadMessages());
    }

    onDelete(id: number): void {
        if (!confirm('Supprimer ce message ?')) return;
        this.contactService.delete(id).subscribe(() => this.loadMessages());
    }
}