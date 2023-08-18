const express = require('express');
const Subject = require('../models/Subject.model');
const Book = require('../models/Book.model');
const router = express.Router();

router.get("/new-subject", (req, res) => {
    Book.find()
        .then((allBooks) => {
            res.render('new-subject', { allBooks })

        })
        .catch((err) => {
            console.log(err)
        })
})
 
router.post("/new-subject", (req, res) => {
    const { name, pricePerHour } = req.body
    const books = req.body.book

    Subject.create({ name, pricePerHour, books })
        .then((newSubject) => {
            return Book.findByIdAndUpdate(newSubject.books, { $push: { subject: newSubject._id } })
        })
        .then((updatedBook) => {
            res.redirect("/subject")
        })
        .catch((err) => {
            console.log(err)
        })
})

/*router.get("/:id/details", (req, res, next) => {
    Subject.findById(req.params.id)
        .then((subjectToBeShowed) => {
            return subjectToBeShowed
        })
        .then((oneSubject) => {
            const arrayBooks = oneSubject.books
            let thinyArray = []

            arrayBooks.forEach(item => {
                Book.findById(item)
                    .then((bookDetails) => {
                        console.log("------------bookDetails.name---------------")                        
                        console.log(bookDetails.name)
                        thinyArray = { "name": bookDetails.name, "price": bookDetails.price }
                    })

                    .catch((err) => {
                        console.log(err)
                    })

            });
            console.log("-------------thinyArray--------------")
            console.log(thinyArray)
            res.render("show-subject", oneSubject);
        })
        .catch((err) => {
            console.log(err)
        })
});*/

router.get("/:id/details", (req, res, next) => {
    Subject.findById(req.params.id)
        .then(subjectToBeShowed => {
            const arrayBooks = subjectToBeShowed.books;
            const thinyArray = [];

            const bookPromises = [];

            for (const item of arrayBooks) {
                bookPromises.push(
                    Book.findById(item)
                        .then(bookDetails => {
                            return { "name": bookDetails.name, "price": bookDetails.price };
                        })
                        .catch(err => {
                            console.log(err);
                        })
                );
            }

            Promise.all(bookPromises)
                .then(results => {
                    thinyArray.push(...results);

                    res.render("show-subject", {
                        subject: subjectToBeShowed,
                        booksArray: thinyArray
                    });
                })
                .catch(err => {
                    console.log(err);
                    // Tratar erro adequadamente
                });
        })
        .catch(err => {
            console.log(err);
            // Tratar erro adequadamente
        });
});

router.get('/:id/edit', (req, res) => {
    Subject.findById(req.params.id).populate('books')
      .then((oneSubjectToBeEdited) => {
        console.log(oneSubjectToBeEdited)
        res.render('edit-subject', oneSubjectToBeEdited)
      })
      .catch((err) => {
        console.log(err)
      })
  })

router.post('/:id/edit', (req, res) => {
    const { name, pricePerHour } = req.body
    Subject.findByIdAndUpdate(req.params.id, { name, pricePerHour })
      .then((updatedSubject) => {
        res.redirect('/subject')
      })
      .catch(err => {
        console.log(err)
      })
  })

router.post('/:id/delete', (req, res) => {
    console.log(req.params)
    Subject.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/subject')
        })
        .catch(err => {
            console.log(err)
        })
})

router.get("/", (req, res, next) => {

    let superUser = false;

    if (req.session.currentUser?.type==="Admin"){
       superUser = true;
    }

    Subject.find()
        .then((allSubjects) => {
            res.render("subject", { allSubjects, superUser });
        })
        .catch((err) => {
            console.log(err)
        })
});

module.exports = router