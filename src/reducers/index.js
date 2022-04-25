import { combineReducers } from 'redux';
import fileSystem from './fileSystemReducer.js';
import  recycleBin from "./recycleBinReducer"

export default combineReducers({ fileSystem, recycleBin });
