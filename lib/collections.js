import {Mongo} from 'meteor/mongo';

export const CodeTables = new Mongo.Collection('CodeTable', {idGeneration: 'MONGO'});
export const Skills = new Mongo.Collection('Skill', {idGeneration: 'MONGO'});
export const Agents = new Mongo.Collection('Agent', {idGeneration: 'MONGO'});
export const ServiceRequests = new Mongo.Collection('ServiceRequest', {idGeneration: 'MONGO'});
