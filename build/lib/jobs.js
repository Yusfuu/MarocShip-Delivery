"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
const node_schedule_1 = require("node-schedule");
const nanoid_1 = require("nanoid");
global.jobs = {};
class Jobs {
    constructor(name = null) {
        //@ts-ignore
        this.name = name;
    }
    register(date = null, fn) {
        if (!date) {
            throw new Error('no date provided');
        }
        const key = (0, nanoid_1.nanoid)();
        const job = (0, node_schedule_1.scheduleJob)(date, fn);
        //@ts-ignore
        job.key = key;
        //@ts-ignore
        global.jobs[key] = { job, date, name: this.name };
        return job;
    }
    remove(key) {
        global.jobs[key].job.cancel();
        delete global.jobs[key];
    }
    size() {
        return Object.keys(global.jobs).length;
    }
    get(key) {
        return global.jobs[key] || null;
    }
    all() {
        return global.jobs;
    }
}
exports.Jobs = Jobs;
//# sourceMappingURL=jobs.js.map