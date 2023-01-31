export interface MFA {
  provider: string
  code: string
  image: string
  exp: Date
}
