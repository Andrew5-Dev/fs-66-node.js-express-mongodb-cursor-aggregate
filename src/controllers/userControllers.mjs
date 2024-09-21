import {ObjectId} from 'mongodb'
import {connectDB} from '../db.mjs'
import chalk, {colorNames} from 'chalk'

export const createUser = async (req, res, next) => {
    try {
        const db = await connectDB()
        const users = db.collection('users')
        const result = await users.insertOne(req.body)
        res.status(201).send(`User created with id ${result.insertedId}`)
    } catch (error) {
        next(error)
    }
}

export const createUsers = async (req, res, next) => {
    try {
        const db = await connectDB()
        const users = db.collection('users')
        const result = await users.insertMany(req.body)
        res.status(201).send(`Users created with ids ${result.insertedIds}`)
    } catch (error) {
        next(error)
    }
}
export const getUser = async (req, res, next) => {
    try {
        const db = await connectDB()
        const users = db.collection('users')
        const result = await users.find({}).toArray()
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
}

// cursor
export const getUserById = async (req, res, next) => {
    try {
        const db = await connectDB()
        const cursor = await db.collection('users').find({_id: new ObjectId(req.params.id)})
        while (await cursor.hasNext()) {
            const result = await cursor.next()
            res.status(200).send(result)
        }
    } catch (error) {
        next(error)
    }
}

//cursor
export const getUsers = async (req, res, next) => {
    try {
        const db = await connectDB()
        const cursor = await db.collection('users').find({})
         while (await cursor.hasNext()) {
            const result = await cursor.next()
            res.status(200).send(result)
        }
    } catch (error) {
        next(error)
    }
}

//aggregate
export const getUsersByAge = async (req, res, next) => {
    try {
        const db = await connectDB()
        const users = db.collection('users')
        const result = await users
            .aggregate([
                {$match: {age: {$gte: 30}}},
                {$project: {name: 1, age: 1}}
            ])
            .toArray()
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
}

//aggregate
export const getUsersByUsername = async (req, res, next) => {
    try {
        const db = await connectDB()
        const users = db.collection('users')
        const result = await users
            .aggregate([
                {$match: {username: req.params.username}},
            ])
            .toArray()
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }

}

export const deleteUser = async (req, res, next) => {
    try {
        const db = await connectDB()
        const users = db.collection('users')
        const result = await users.deleteOne({_id: new ObjectId(req.params.id)})
        if (result.deletedCount === 0) {
            return res.status(404).send('User not found')
        }
        res.status(200).send(`User with id ${req.params.id} deleted`)
    } catch (error) {
        next(error)
    }
}

export const deleteUsers = async (req, res, next) => {
    try {
        const db = await connectDB()
        const users = db.collection('users')
        const result = await users.deleteMany({age: {$gte: 30}})
        res.status(200).send(`Deleted ${result.deletedCount} users`)
    } catch (error) {
        next(error)
    }
}
export const updateUser = async (req, res, next) => {
    try {
        const db = await connectDB()
        const users = db.collection('users')
        const result = await users.updateOne({_id: new ObjectId(req.params.id)}, {$set: req.body})
        if (result.matchedCount === 0) {
            return res.status(404).send('User not found')
        }
        res.status(200).send(`User with id ${req.params.id} updated`)
    } catch (error) {
        next(error)
    }
}

export const updateUsers = async (req, res, next) => {
    try {
        const db = await connectDB()
        const users = db.collection('users')
        const result = await users.updateMany({age: {$gte: 30}}, {$inc: {age: 1}})
        res.status(200).send(`Updated ${result.modifiedCount} users`)
    } catch (error) {
        next(error)
    }
}




