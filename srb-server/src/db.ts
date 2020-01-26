import mongoose from 'mongoose'

export const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'srb'
    })

    console.info('Database is on the air!')
  } catch (e) {
    console.error('unable to connect DB:', e)
  }
}