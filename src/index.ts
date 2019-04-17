import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

const db = admin.firestore()

export const userCreate = functions.auth.user().onCreate(async user => {
    const userJson = user.toJSON()
    const email = user.email

    if (email)
        await admin.auth().generateEmailVerificationLink(email)
        
    return db.collection('users').doc(user.uid).create(userJson)
})