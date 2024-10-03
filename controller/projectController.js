const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { project, user } = require("../db/models");

// create project
const createProject = catchAsync(async (req, res, next) => {
  const body = req.body;

  const userId = req.user.id;

  const newProject = await project.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });

  return res.status(201).json({
    staus: "success",
    data: newProject,
  });
});

// all project
const getAllProject = catchAsync(async (req, res, next) => {
  const result = await project.findAll({
    include: user,
  });

  return res.json({
    status: "success",
    data: result,
  });
});

// project by id
const getProjectById = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;

  const userId = req.user.id
  const result = await project.findByPk(projectId, { include: user,
   where: {
      createdBy: userId
   }
   });
  
  if (!result) {
    return next(new AppError("Invalid Project Id", 401));
  }
  return res.json({
    status: "success",
    data: result,
  });
});

//  update project
const updateProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const projectId = req.params.id;

  const body = req.body;
  const result = await project.findOne({ id: projectId, createdBy: userId });

  if (!result) {
    return next(new AppError("Invalid Project Id", 401));
  }

  result.title = body.title;
  result.productImage = body.productImage;
  result.price = body.price;
  result.shortDescription = body.shortDescription;
  result.description = body.description;
  result.productUrl = body.productUrl;
  result.category = body.category;
  result.tags = body.tags;

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

// deleted
const deleteProject = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const projectId = req.params.id;

  const body = req.body;
  const result = await project.findOne({ id: projectId, createdBy: userId });

  if (!result) {
    return next(new AppError("Invalid Project Id", 401));
  }
  await result.destroy();

  return res.json({
    status: "success",
    message: "Record Deleted Successfully",
  });
});

module.exports = {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
};
