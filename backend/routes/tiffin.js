router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 6, type, search } = req.query;
    const query = {};
    if(type) query.type = type;
    if(search) query.name = { $regex: search, $options: 'i' };

    console.log('Query:', query);

    const skip = (Number(page)-1) * Number(limit);
    const plans = await Tiffin.find(query).skip(skip).limit(Number(limit));
    console.log('Plans fetched:', plans);

    res.json({ plans, total: await Tiffin.countDocuments(query), page: Number(page), limit: Number(limit) });
  } catch(err) {
    console.error('Error fetching tiffin plans:', err);
    res.status(500).json({ error: 'Server error fetching tiffin plans.' });
  }
});
