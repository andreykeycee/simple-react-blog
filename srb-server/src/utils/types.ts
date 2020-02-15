import { ObjectId as Id } from 'srb-shared'
import { ID } from 'type-graphql'
import mongoose from 'mongoose'

export type ObjectId = Id<mongoose.Schema.Types.ObjectId>


