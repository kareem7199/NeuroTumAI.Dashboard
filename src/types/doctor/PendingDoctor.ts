export default interface PendingDoctor {
    id: number;
    profilePicture: string;
    fullName: string;
    userName: string;
    email: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female';
    age: number;
    licenseDocumentFront: string;
    licenseDocumentBack: string;
  }
  