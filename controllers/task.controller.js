const TaskService = require('../services/task.service');

exports.createTask = async (req, res) => {
  try {

    if (req.body.deadline && isNaN(Date.parse(req.body.deadline))) {
      return res
        .status(400)
        .json({ message: 'Invalid deadline format' });
    }

    const images = (req.files?.images || []).map(f => ({
      url: `/uploads/tasks/${f.filename}`,
      name: f.originalname,
    }));

    const documents = (req.files?.documents || []).map(f => ({
      url: `/uploads/tasks/${f.filename}`,
      name: f.originalname,
      size: f.size,
      type: f.mimetype,
    }));

    let links = [];
    if (req.body.links) {
      try {
        links = Array.isArray(req.body.links)
          ? req.body.links
          : JSON.parse(req.body.links);
      } catch {
        links = [];
      }
    }

    const deadline =
      req.body.deadline && req.body.deadline !== ''
        ? new Date(String(req.body.deadline))
        : null;


    const task = await TaskService.createTask({
      title: req.body.title,
      description: req.body.description || '',
      deadline,
      isImportant: req.body.isImportant === 'true',
      notify: req.body.notify === 'true',
      links,
      images,
      documents,
      categoryId: req.body.categoryId,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error('CREATE TASK ERROR:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {

    if (req.body.deadline && isNaN(Date.parse(req.body.deadline))) {
      return res
        .status(400)
        .json({ message: 'Invalid deadline format' });
    }
    
    const existing = await TaskService.getTaskById(
      req.params.id,
      req.user.id
    );

    if (!existing) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const newImages = (req.files?.images || []).map(f => ({
      url: `/uploads/tasks/${f.filename}`,
      name: f.originalname,
    }));

    const newDocuments = (req.files?.documents || []).map(f => ({
      url: `/uploads/tasks/${f.filename}`,
      name: f.originalname,
      size: f.size,
      type: f.mimetype,
    }));

    let links = existing.links;
    if (req.body.links) {
      try {
        links = Array.isArray(req.body.links)
          ? req.body.links
          : JSON.parse(req.body.links);
      } catch {}
    }

    const deadline =
      req.body.deadline && req.body.deadline !== ''
        ? new Date(String(req.body.deadline))
        : null;


    const updated = await TaskService.updateTask(
      req.params.id,
      req.user.id,
      {
        title: req.body.title,
        description: req.body.description,
        deadline,
        isImportant: req.body.isImportant === 'true',
        notify: req.body.notify === 'true',
        links,
        images: [...existing.images, ...newImages],
        documents: [...existing.documents, ...newDocuments],
      }
    );

    res.json(updated);
  } catch (err) {
    console.error('UPDATE TASK ERROR:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.getTasksByCategory = async (req, res) => {
  const data = await TaskService.getTasksByCategory(
    req.user.id,
    req.params.categoryId,
    req.query.search || ''
  );
  res.json(data);
};

exports.getTaskById = async (req, res) => {
  const task = await TaskService.getTaskById(
    req.params.id,
    req.user.id
  );
  res.json(task);
};

exports.toggleComplete = async (req, res) => {
  await TaskService.toggleComplete(req.params.id, req.user.id);
  res.json({ success: true });
};

exports.togglePriority = async (req, res) => {
  await TaskService.togglePriority(req.params.id, req.user.id);
  res.json({ success: true });
};

exports.deleteTask = async (req, res) => {
  await TaskService.deleteTask(req.params.id, req.user.id);
  res.json({ success: true });
};
