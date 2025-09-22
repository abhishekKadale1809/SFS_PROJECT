import { RequestHandler } from "express";
import fs from "fs/promises";
import path from "path";
import { Enquiry, EnquiryCreateRequest, EnquiryCreateResponse, EnquiryListResponse } from "@shared/api";

const DATA_DIR = path.join(process.cwd(), "server", "data");
const DATA_FILE = path.join(DATA_DIR, "enquiries.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
}

async function readEnquiries(): Promise<Enquiry[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeEnquiries(data: Enquiry[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

function sanitize(input: string) {
  return input.trim();
}

export const handleEnquiryCreate: RequestHandler = async (req, res) => {
  const { name, email, phone, message } = req.body as EnquiryCreateRequest;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const now = new Date().toISOString();
  const enquiry: Enquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone),
    message: sanitize(message),
    createdAt: now,
  };

  try {
    const list = await readEnquiries();
    list.unshift(enquiry);
    await writeEnquiries(list);
    const payload: EnquiryCreateResponse = { success: true, enquiry };
    res.status(201).json(payload);
  } catch (e) {
    res.status(500).json({ error: "Unable to save enquiry" });
  }
};

export const handleEnquiryList: RequestHandler = async (req, res) => {
  const key = req.header("x-admin-key");
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = await readEnquiries();
    const payload: EnquiryListResponse = { success: true, data };
    res.status(200).json(payload);
  } catch (e) {
    res.status(500).json({ error: "Unable to read enquiries" });
  }
};
