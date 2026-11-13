import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

class NoopWebSocket {}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private platformId = inject(PLATFORM_ID);
  private _client: SupabaseClient | null = null;

  get client(): SupabaseClient {
    if (!this._client) {
      // Node 20 has no native WebSocket, and supabase-js throws while building its
      // realtime client during SSR. We never use realtime, so on the server we hand
      // it a stub transport; the browser keeps its native WebSocket.
      this._client = createClient(
        environment.supabase.url,
        environment.supabase.key,
        this.isBrowser ? undefined : { realtime: { transport: NoopWebSocket as any } }
      );
    }
    return this._client;
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
