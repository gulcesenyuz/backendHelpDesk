const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Questions = require('../models/question');

const questionRouter = express.Router();

questionRouter.use(bodyParser.json());

questionRouter.route('/')
    .get((req, res, next) => {
        Questions.find({})
            .then((questions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(questions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Questions.create(req.body)
            .then((question) => {
                console.log('Question posed ', question);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /questions');
    })
    .delete((req, res, next) => {
        Questions.remove({})
            .then((question) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

questionRouter.route('/:questionId')
    .get((req, res, next) => {
        Questions.findById(req.params.questionId)
            .then((question) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.questionId);
    })
    .put((req, res, next) => {
        Questions.findByIdAndUpdate(req.params.questionId, {
            $set: req.body
        }, { new: true })
            .then((question) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Questions.findByIdAndRemove(req.params.questionId)
            .then((question) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(question);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = questionRouter;