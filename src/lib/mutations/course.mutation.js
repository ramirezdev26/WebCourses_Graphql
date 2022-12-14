const connectDB = require('../db/db')
const { ObjectID } = require('mongodb')


module.exports = {
    createCourse: async (root, {input}) => {
        const defaults = {
            teacher: '',
            topic: ''
        }

        const newCourse = Object.assign(defaults, input)
        let db
        let course
        try {
            db = await connectDB()
            course = await db.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (error) {
            console.error(error)
        }
        return newCourse
    },
    editCourse: async (root, {_id, input}) => {
        let db
        let course
        try {
            db = await connectDB()
            await db.collection('courses').updateOne(
                { _id: ObjectID(_id) },
                { $set: input }
                )
                course = await db.collection('courses').findOne({_id: ObjectID(_id)})
        } catch (error) {
            console.log(error)
        }
        return course
    },
    deleteCourse: async (root, {_id}) => {
        let db
        let info
        try {
            db = await connectDB()
            info = await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
        } catch (error) {
            console.log(error)
        }
        return info.deletedCount
        ? `El curso con id ${_id} fue eliminado exitosamente.`
        : 'No existe el curso con el id indicado';
    }
}