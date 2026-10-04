import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://ffzonsnfyxhavyfpiqty.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmem9uc25meXhoYXZ5ZnBpcXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNDM1ODAsImV4cCI6MjEwNjYxOTU4MH0.78x9dQePlE0HmistsAKLCJQU7Xnc2V88U8E24Uuk62M';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  get clientInstance(): SupabaseClient {
    return this.client;
  }

  /**
   * Uploads candidate resume to Supabase Storage bucket 'resumes'
   * and returns the public download/preview URL.
   */
  async uploadResume(file: File): Promise<{ publicUrl: string; fileName: string }> {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `resumes/${timestamp}_${sanitizedName}`;

    const { data, error } = await this.client.storage
      .from('resumes')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase Storage upload error:', error);
      throw error;
    }

    const { data: urlData } = this.client.storage
      .from('resumes')
      .getPublicUrl(data.path);

    return {
      publicUrl: urlData.publicUrl,
      fileName: file.name,
    };
  }
}
