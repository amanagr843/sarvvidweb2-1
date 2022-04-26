import { combineReducers } from 'redux';
import fileSystem from './fileSystemReducer.js';
import recycleBin from "./recycleBinReducer"
import storage from "./storageReducer"

export default combineReducers({ fileSystem, recycleBin, storage });
