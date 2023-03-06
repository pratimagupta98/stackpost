const Category = require("../models/category");
const resp = require("../helpers/apiResponse");

exports.addCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = new Category({
    name: name,
  });

  newCategory
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getallCategory = async (req, res) => {
  await Category.find()
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneCategory = async (req, res) => {
  await Category.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.editCategory = async (req, res) => {
  const { title, desc, cat_img } = req.body;
  data = {};
  if (title) {
    data.title = title;
  }
  if (desc) {
    data.desc = desc;
  }

  if (req.files) {
    if (req.files.cat_img) {
      alluploads = [];
      for (let i = 0; i < req.files.cat_img.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.cat_img[i].path,
          {
            use_filename: true,
            unique_filename: false,
          }
        );
        fs.unlinkSync(req.files.cat_img[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.cat_img = alluploads;
    }
  }

  await Category.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: data },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltCategory = async (req, res) => {
  await Category.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.total_category = async (req, res) => {
  await Category.countDocuments()
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
