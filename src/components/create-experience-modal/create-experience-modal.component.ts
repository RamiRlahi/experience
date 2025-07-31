import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-experience-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div *ngIf="show" class="modal-overlay" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Create New Experience</h2>
        <p class="subtitle">create your new experience</p>
        <form [formGroup]="form" (ngSubmit)="onCreate()">
          <label>Title
            <input formControlName="title" type="text" placeholder="Title" />
          </label>
          <label>Base URL
            <input formControlName="baseUrl" type="text" placeholder="Base URL" />
          </label>
          <label>Default locale
            <input formControlName="defaultLocale" type="text" placeholder="en-US" />
          </label>
          <label>Additionnel locales
            <input formControlName="additionalLocales" type="text" placeholder="Locales" />
          </label>
          <label>Thumbnail</label>
          <div class="upload-area"
            [class.dragover]="dragOver"
            (dragover)="onDragOver($event)"
            (dragleave)="onDragLeave($event)"
            (drop)="onDrop($event)">
            <ng-container *ngIf="!thumbnail">
              <div class="upload-icon">📁</div>
              <div>Drag your file(s) to start uploading</div>
              <div class="or">OR</div>
              <label class="browse-btn">
                Browse files
                <input type="file" accept=".png,.jpeg,.jpg" (change)="onFileSelected($event)" hidden />
              </label>
            </ng-container>
            <ng-container *ngIf="thumbnail">
              <div class="file-preview">
                <img *ngIf="thumbnailUrl" [src]="thumbnailUrl" alt="thumbnail" />
                <span class="file-name">{{ thumbnail.name }}</span>
              </div>
            </ng-container>
          </div>
          <div class="upload-hint">Only support .png/.jpeg and Maximum size: 1000MB</div>
          <div class="modal-actions">
            <button type="button" class="cancel-btn" (click)="onClose()">Cancel</button>
            <button type="submit" class="create-btn" [disabled]="form.invalid">Create</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(30, 41, 59, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    .modal-content {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(30, 41, 59, 0.18);
      padding: 1.5rem 1.5rem 1.5rem 1.5rem;
      min-width: 350px;
      max-width: 400px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      position: relative;
    }
    h2 {
      margin: 0 0 0.1rem 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: #1a202c;
    }
    .subtitle {
      margin: 0 0 0.8rem 0;
      color: #64748b;
      font-size: 0.9rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }
    label {
      font-weight: 500;
      color: #1a202c;
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    input[type="text"] {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.5rem 0.8rem;
      font-size: 0.9rem;
      background: #f7f9fb;
      color: #1a202c;
      outline: none;
      transition: border 0.2s;
    }
    input[type="text"]:focus {
      border-color: #2563eb;
    }
    .upload-area {
      background: #f7f9fb;
      border: 2px dashed #2563eb;
      border-radius: 12px;
      padding: 1rem 0.8rem;
      text-align: center;
      margin-bottom: 0.3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-height: 100px;
      position: relative;
      transition: border-color 0.2s;
    }
    .upload-area.dragover {
      border-color: #1746a2;
      background: #e7f0fe;
    }
    .upload-icon {
      font-size: 1.8rem;
      color: #2563eb;
      margin-bottom: 0.1rem;
    }
    .or {
      color: #64748b;
      font-size: 0.85rem;
      margin: 0.1rem 0;
    }
    .browse-btn {
      background: #2563eb;
      color: #fff;
      border-radius: 8px;
      padding: 0.4rem 1rem;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      display: inline-block;
      margin-top: 0.2rem;
      transition: background 0.2s;
    }
    .browse-btn:hover {
      background: #1746a2;
    }
    .file-preview {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      justify-content: center;
    }
    .file-preview img {
      max-width: 36px;
      max-height: 36px;
      border-radius: 6px;
      object-fit: contain;
      background: #fff;
      border: 1px solid #e5e7eb;
    }
    .file-name {
      color: #2563eb;
      font-size: 0.98rem;
      font-weight: 500;
      word-break: break-all;
    }
    .upload-hint {
      color: #64748b;
      font-size: 0.8rem;
      margin-top: -0.3rem;
      margin-bottom: 0.3rem;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.8rem;
      margin-top: 0.8rem;
    }
    .cancel-btn {
      background: #f7f9fb;
      color: #64748b;
      border: none;
      border-radius: 8px;
      padding: 0.4rem 1rem;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    .cancel-btn:hover {
      background: #e5e7eb;
    }
    .create-btn {
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 0.4rem 1.2rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .create-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .create-btn:hover:not(:disabled) {
      background: #1746a2;
    }
  `],
})
export class CreateExperienceModalComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  form: FormGroup;
  dragOver = false;
  thumbnail: File | null = null;
  thumbnailUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      baseUrl: ['', Validators.required],
      defaultLocale: ['', Validators.required],
      additionalLocales: [''],
    });
  }

  onClose() {
    this.close.emit();
  }

  onCreate() {
    if (this.form.valid) {
      this.create.emit({ ...this.form.value, thumbnail: this.thumbnail });
      this.onClose();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    if (event.dataTransfer && event.dataTransfer.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }
  handleFile(file: File) {
    if (!file.type.match(/image\/(png|jpeg)/) || file.size > 1000 * 1024 * 1024) {
      return;
    }
    this.thumbnail = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.thumbnailUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
} 