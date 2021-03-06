import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  imageObject: Array<object> = [];

  constructor(private afs: AngularFirestore) {}

  getGalleryService() {
    return this.afs.collection('gallery').valueChanges({ idField: 'eventId' });
  }
}
