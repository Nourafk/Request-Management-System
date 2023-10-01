const { validateRequest, Request } = require("../models/Request");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
const router = require("express").Router();

// create request.
router.post("/newRequest", auth, async (req, res) => {
  const { error } = validateRequest(req.body);

  if (error)
    return res.status(400).json({ error: error.details[0].message });

  const { title, description, status } = req.body;
  
  try {
    const newRequest = new Request({
      title,
      description,
      status,
      creator: req.user,
      creationDate: Date.now(),
      creatorName:req.user.name,
    
    });
    const result = await newRequest.save();
      return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});


// fetch all requests.
router.get("/myRequests", auth, async (req, res) => {
  try {
    
    const allRequests = await Request.find();

    return res.status(200).json({ requests: allRequests.reverse() });
  } catch (err) {
    console.log(err);
  }
});

//to edit request
router.put('/editRequest/:id', auth, async(req, res) => {
  const { id } = req.params;
  try{
    const updatedData = { ...req.body, id: undefined };
        const result = await Request.findByIdAndUpdate(id, updatedData, {
          new: true,
        });
      
      return res.status(200).json({ ...result._doc });
        } catch (err) {
          console.log(err);
        }

});


// to get a single request.
router.get("/request/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    const request = await Request.findOne({ _id: id });

    return res.status(200).json({ ...request._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;


