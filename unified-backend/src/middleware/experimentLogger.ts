import { Request, Response, NextFunction } from "express";

export function experimentLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  let experimentName = "LANDING";
  if (req.path.startsWith("/VRDS_CVR_APA")) {
    experimentName = "CVR_APA";
  } else if (req.path.startsWith("/VRDS_CVR")) {
    experimentName = "CVR_ONLY";
  } else if (req.path.startsWith("/VRDS_APA")) {
    experimentName = "APA_ONLY";
  } else if (req.path.startsWith("/VRDS_BASELINE")) {
    experimentName = "BASELINE";
  }

  req.headers["x-experiment-name"] = experimentName;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logLine = `[${new Date().toISOString()}] ${experimentName} ${req.method} ${req.path} ${res.statusCode} ${duration}ms`;

    if (res.statusCode >= 400) {
      console.error(logLine);
    } else if (!req.path.includes("/health")) {
      console.log(logLine);
    }
  });

  next();
}

export function getExperimentFromRequest(req: Request): string {
  return (req.headers["x-experiment-name"] as string) || "UNKNOWN";
}
