export interface AuthAdapter {
  getToken(): string | null;
  isAuthenticated(): boolean;
  user: { name?: string; email?: string } | null;
}
