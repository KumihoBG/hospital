const Submodel = require('../models/Submodel.js');
const User = require('../models/User.js');

async function getAll() {
    const subModels = await Submodel.find().sort({ createdAt: -1 }).lean();
    return subModels;
}

async function getSubmodelById(id) {
    const subModel = await Submodel.findById(id).populate('buddies').lean();
    return subModel;
}

async function createSubmodel(submodelData, id) {
    const subModel = new Submodel(submodelData);
    const currentUser = await User.findById(id);
    currentUser.tripsHistory.push(subModel._id);
    await subModel.save();
    await currentUser.save();
    return subModel;
}

async function editSubmodel(id, submodelData) {
    const subModel = await Submodel.findById(id);
    subModel.startPoint = submodelData.startPoint.trim();
    subModel.endPoint = submodelData.endPoint.trim();
    subModel.date = submodelData.date.trim();
    subModel.time = submodelData.time.trim();
    subModel.imageUrl = submodelData.imageUrl.trim();
    subModel.carBrand = submodelData.carBrand.trim();
    subModel.seats = submodelData.seats.trim();
    subModel.price = submodelData.price.trim();
    subModel.description = submodelData.description.trim();
    subModel.buddies = submodelData.buddies;
    return await subModel.save();
}

async function deleteSubmodel(id) {
    return await Submodel.findByIdAndDelete(id);
}

async function joinSubmodel(subModelId, userId) {
    const subModel = await Submodel.findById(subModelId);
    subModel.buddies.push(userId);
    subModel.seats--;
    return await subModel.save();
}

module.exports = {
    createSubmodel,
    editSubmodel,
    getAll,
    getSubmodelById,
    deleteSubmodel,
    joinSubmodel,
}