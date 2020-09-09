const Model = require('../models/User');

const service = {
    async findById(id) {
        try {
            const user = await Model.findById(id).lean();
            return { user, error: null };
        } catch (error) {
            return { user: null, error };
        }
    },

    async findByProviderIdOrCreate(providerId, userData) {
        try {
            let user;
            user = await Model.findOne({ providerId }).lean();
            if (!user) user = await Model.create(userData);
            return { user, error: null };
        } catch (error) {
            return { user: null, error };
        }
    }
};

module.exports = service;
