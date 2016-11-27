import {Mongo} from 'meteor/mongo';

export const Agents = new Mongo.Collection('Agent', {idGeneration: 'MONGO'});
export const Skills = new Mongo.Collection('Skill', {idGeneration: 'MONGO'});
