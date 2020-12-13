"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsv = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const stream_1 = require("stream");
const statement_1 = require("../models/statement");
const statementLine_1 = require("../models/statementLine");
const constants_1 = require("./constants");
const moment_1 = __importDefault(require("moment"));
function readCsv(buffer, headers) {
    const results = [];
    return new Promise((resolve, reject) => {
        const readable = new stream_1.Readable();
        readable._read = () => { };
        readable.push(buffer);
        readable.push(null);
        readable.pipe(csv_parser_1.default(headers))
            .on('data', (data) => results.push(data))
            .on('end', () => {
            resolve(results);
        });
    });
}
function createStatementAndSaveLines(userId, date, statementLines) {
    return __awaiter(this, void 0, void 0, function* () {
        let statement = new statement_1.Statement();
        statement.user = userId;
        statementLines.forEach(statementLine => {
            statementLine.statement = statement._id;
            statement.statementLines.push(statementLine);
        });
        const savedStatement = yield statement.save();
        return savedStatement;
    });
}
function saveAllLines(lines) {
    return __awaiter(this, void 0, void 0, function* () {
        const savedLines = yield statementLine_1.StatementLine.insertMany(lines);
        return savedLines;
    });
}
function getDateFromFileName(fileName) {
    let dateParts = fileName.split("-");
    let datePart = dateParts[1] + "-" + dateParts[2];
    return moment_1.default(datePart, "YYYY-MM").format("YYYY-MM-DD");
}
function parseCsv(userId, fileName, buffer, createContacts) {
    return __awaiter(this, void 0, void 0, function* () {
        let date = getDateFromFileName(fileName);
        if (date === "Invalid date") {
            return new Promise((resolve, reject) => {
                let errorObject = {
                    "errors": {
                        "message": "Invalid Date"
                    }
                };
                return reject(errorObject);
            });
        }
        let headers = createContacts ? constants_1.Constants.allStatementCsvHeaders : constants_1.Constants.noContactStatementCsvHeaders;
        return readCsv(buffer, headers).then(parsedData => {
            let lines = [];
            parsedData.forEach((el) => {
                let statementLine = new statementLine_1.StatementLine();
                statementLine.date = el.CurrentDate;
                statementLine.donorAccount = el.DonorAcctNo;
                statementLine.churchOrg = el.DonorName;
                statementLine.fullName = el.DonorFirstName + " " + el.DonorLastName;
                statementLine.amount = el.CurrentAmt;
                statementLine.class = el.ClassNo;
                statementLine.pledgeDate = el.PledgeDate;
                statementLine.pledgeAmount = el.PledgeAmt;
                statementLine.yearToDateAmount = el.YTDAmt;
                statementLine.receiptCount = el.ReceiptCount;
                if (createContacts) {
                    // do contact stuff
                }
                lines.push(statementLine);
            });
            const savedLines = saveAllLines(lines);
            return savedLines;
        }).then((lines) => __awaiter(this, void 0, void 0, function* () {
            const savedStatement = yield createStatementAndSaveLines(userId, date, lines);
            return savedStatement;
        }));
    });
}
exports.parseCsv = parseCsv;
//# sourceMappingURL=statementParser.js.map