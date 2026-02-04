interface GoogleEmail {
    value: string,
    type: string
}

interface GooglePhotos {
    value: string,
    type: string
}

export interface GoogleUserProfile {
  provider: string,
  sub: string,
  id: string,
  displayName: string,
  name: {
    givenName: string,
    familyName?: string
  },
  given_name: string,
  family_name?: string,
  email_verified: boolean,
  verified: boolean,
  email: string,
  emails: GoogleEmail[],
  photos: GooglePhotos[],
  picture: string,
}
