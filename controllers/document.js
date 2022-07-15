const Document = require('../models/Document');

module.exports.createDocument = async (req, res) => {  
  try {    
    const document = await Document.create(req.body)
    
    if (document) {
      afterCreateDocument(document._id, document.proofOfID.uno, document.proofOfID.dos)
      res.json({ message: "success", document })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.browseDocument = async (req, res) => {
  try {
    const listDocument = await Document.find();

    if (listDocument) {
      res.json({ message: "success", data: listDocument })
    }
  } catch(error) {
    res.json({ message: "failed", error })
  }
}

module.exports.updateDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const updateDocument = await Document.findByIdAndUpdate(id, {
      status: req.body.status
    });

    if (updateDocument) {
      res.json({ message: "success", document: updateDocument });
    }
  } catch (error) {
    res.json({ message: 'failed', error })
  }
}

// extra functions

const afterCreateDocument = async (documentID, documentProof1, documentProof2) => {
  await Document.findByIdAndUpdate(documentID, {
    proofOfID: {
      uno: `pod/images/${documentID}/${documentProof1}`,
      dos: `pod/images/${documentID}/${documentProof2}`
    }
  })
}