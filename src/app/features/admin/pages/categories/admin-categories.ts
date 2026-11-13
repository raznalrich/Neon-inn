import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminProductService } from '../../services/admin-product.service';

@Component({
    selector: 'app-admin-categories',
    imports: [FormsModule],
    templateUrl: './admin-categories.html',
    styleUrl: './admin-categories.scss'
})
export class AdminCategories {
    newCategory = signal('');
    editingName = signal<string | null>(null);
    editValue   = signal('');

    constructor(public productSvc: AdminProductService) {}

    async add() {
        const name = this.newCategory().trim();
        if (!name) return;
        try {
            await this.productSvc.addCategory(name);
            this.newCategory.set('');
        } catch (e: any) {
            alert(e.message ?? 'Failed to add category');
        }
    }

    startEdit(name: string) {
        this.editingName.set(name);
        this.editValue.set(name);
    }

    async saveEdit(original: string) {
        try {
            await this.productSvc.renameCategory(original, this.editValue());
            this.editingName.set(null);
        } catch (e: any) {
            alert(e.message ?? 'Failed to rename category');
        }
    }

    cancelEdit() { this.editingName.set(null); }

    async delete(name: string) {
        if (confirm(`Delete category "${name}"? Products in this category will keep the name.`)) {
            try {
                await this.productSvc.deleteCategory(name);
            } catch (e: any) {
                alert(e.message ?? 'Failed to delete category');
            }
        }
    }

    productCount(cat: string): number {
        return this.productSvc.products().filter(p => p.category === cat).length;
    }
}
