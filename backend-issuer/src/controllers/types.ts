export type MemberStatus = 'pending' | 'approved' | 'verified'

export interface Member {
  /**
   * @isInt
   * @minimum 1
   */
  id: number
  companyName: string
  /**
   * @pattern ^[0-9A-Za-z]{8}$
   */
  companiesHouseNumber: string
  /**
   * @pattern ^(.+)@(.+)$
   * @example example@example.com
   */
  email: string
  status: MemberStatus
  did: string
  /**
   * @pattern ^[-A-Za-z0-9+/]*={0,3}$
   */
  verificationCode?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * The applying member's details
 */
export interface MemberCreate
  extends Pick<
    Member,
    'companyName' | 'companiesHouseNumber' | 'email' | 'did'
  > {}

/**
 * The verification code received from NICE
 */
export interface ConfirmApplication
  extends Required<Pick<Member, 'verificationCode'>> {}
