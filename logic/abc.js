const mongoose = require('mongoose');
const Project = require("../models/project");
var nodemailer = require('nodemailer');

module.exports = {

    getProject: async (req, res, next) => {
        // res.send("hello world")
        Project.find()
            .then((result) => {

                res.json({
                    ress: result.map(res => {
                        return {
                            pn: res.PN,
                            y: res.Y,
                            fs: res.FS,
                            ss: res.SS,
                            ts: res.TS,
                            sv: res.SV.FN,
                            pr: res.PR.FN,
                            ex: res.EX.FN,
                            viva: res.VIVA,

                            id: res._id
                        }
                    })
                })
            })
            .catch((err) => {
                console.log(err);
            });
    },

    getProjectbyid: async (req, res, next) => {
        // res.send("hello world")
        Project.findById(req.params.id)
            .then((result) => {

                res.json({
                    ress: {
                        pn: result.PN,
                        y: result.Y,
                        fs: result.FS,
                        ss: result.SS,
                        ts: result.TS,
                        viva: result.VIVA,

                        id: result._id
                    }


                })
            })
            .catch((err) => {
                console.log(err);
            });
    },

    postProject: async (req, res) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rami.mammeri@univ-constantine2.dz',
              pass: 'MassilBEN2003'
            }
          });
          
          var mailOptions = {
            from: 'rami.mammeri@univ-constantine2.dz',
            to: 'rmmfly2002@gmail.com',
            subject: 'viva ',
            text: `rrrami $`,
           
          
            
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        const project = new Project();
        project.PN = req.body.PN;
        project.Y = req.body.Y;
        project.FS = req.body.FS;
        project.SS = req.body.SS;
        project.TS = req.body.TS;
        project.SV.FN = req.body.SVN;
        project.PR.FN = req.body.PRN;
        project.EX.FN = req.body.EXN;
        project.SV.MARK = req.body.SVM;
        project.PR.MARK = req.body.PRM;
        project.EX.MARK = req.body.EXM;
        project.VIVA = (0.3 * project.SV.MARK) + (0.3 * project.PR.MARK) + (0.4 * project.EX.MARK);

        await project.save()
            .then((result) => {
                res.send("cbn");
            })
            .catch((err) => {
                console.log(err);
            })
           


    },

    deleteProject: (req, res) => {
        const id = req.params.id;
        const del = Project.findByIdAndDelete(id)
            .then((result) => {
                res.json({ "delete": del });
            }

            )
            .catch((e) => {
                console.log(e);
            })
    }

}