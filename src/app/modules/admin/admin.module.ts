import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminAuthLoaderComponent } from './pages/admin/components/auth-loader/auth-loader.component';
import { AdminPriceEditorComponent } from './pages/admin/components/price-editor/price-editor.component';
import { AdminAddDialogComponent } from './pages/admin/components/add-dialog/add-dialog.component';
import { AdminDeleteDialogComponent } from './pages/admin/components/delete-dialog/delete-dialog.component';
import { AdminReviewDialogComponent } from './pages/admin/components/review-dialog/review-dialog.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, AdminRoutingModule],
  declarations: [
    AdminComponent,
    AdminAuthLoaderComponent,
    AdminPriceEditorComponent,
    AdminAddDialogComponent,
    AdminDeleteDialogComponent,
    AdminReviewDialogComponent,
  ],
})
export class AdminModule {}
