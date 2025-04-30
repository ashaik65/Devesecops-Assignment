# 🔐 Security Pipeline for Your Repository

This project includes a robust GitHub Actions–based **Security Pipeline** to ensure secure coding practices, dependency hygiene, and container safety.

> ✅ The pipeline runs automatically on every push and pull request to `main` or `security-pipeline` branches, and also weekly on Sundays.

---

## 🧭 Features Overview

| Security Check Type                      | Tool Used           | Description |
|------------------------------------------|---------------------|-------------|
| **Static Application Security Testing**  | CodeQL              | Detects coding flaws and vulnerabilities like SQLi, XSS, etc. |
| **Dependency Scanning**                  | Trivy (Filesystem)  | Scans dependencies in your source code for known CVEs. |
| **Code Linting with Security Rules**     | ESLint + Plugins    | Enforces secure JS/TS coding standards. |
| **Secret Scanning**                      | Gitleaks            | Identifies hardcoded secrets (API keys, tokens, etc.). |
| **Container Image Scanning**             | Trivy (Image)       | Scans Docker image for OS and library vulnerabilities. |

---

## 🧪 1. Static Application Security Testing (SAST)

**🔧 Tool:** [GitHub CodeQL](https://github.com/github/codeql-action)  
**📦 Language:** JavaScript/TypeScript

CodeQL analyzes the source code to detect common security vulnerabilities before deployment.  
A `.sarif` report is generated and uploaded for each workflow run.

---

## 📦 2. Dependency Scanning

**🔧 Tool:** [Trivy](https://github.com/aquasecurity/trivy)

Trivy scans your project for vulnerabilities in open-source packages listed in:
- `package.json` and `yarn.lock`

**Output:**
- `trivy-results.json` (JSON report)
- `trivy-report.txt` (Table format)

---

## 🧹 3. Code Linting with Security Rules

**🔧 Tool:** [ESLint](https://eslint.org/)

**🔒 Plugins:**
- `eslint-plugin-security`
- `eslint-plugin-node`

This ensures secure JavaScript/TypeScript coding practices and identifies potential issues with:
- Node.js APIs
- Common JS misuses
- Insecure code patterns

**Output:**
- `eslint-results.json`

---

## 🔐 4. Secret Scanning

**🔧 Tool:** [Gitleaks](https://github.com/gitleaks/gitleaks)

Gitleaks scans for secrets like:
- API keys
- Access tokens
- Passwords in source files or history

**Output Includes:**
- Rule ID
- Commit ID
- File and line number
- Author and timestamp
- **Clickable "View Secret" links**

**Example Output:**

| Rule ID        | Commit  | Secret URL       | Start Line | Author   | Date       | Email                | File                            |
|----------------|---------|------------------|------------|----------|------------|-----------------------|----------------------------------|
| generic-api-key | 5001323 | [View Secret](...) | 22         | ashaik65 | 2025-04-30 | anisshaikh1439@gmail.com | `src/store/slices/configuration.ts` |

---

## 🐳 5. Container Image Scanning

**🔧 Tool:** [Trivy](https://aquasecurity.github.io/trivy/)

After building the Docker image from your `Dockerfile`, Trivy scans it for vulnerabilities in:
- Operating system layers (Alpine)
- Node.js runtime
- Application dependencies

**Output:**
- `image-results.json`
- `image-report.txt`

---

## 🗂 Artifacts Uploaded

Each tool’s results are uploaded as downloadable artifacts:

- `eslint-results.json`
- `gitleaks-results.json`
- `trivy-reports/` (dependency scan)
- `trivy-container-reports/` (Docker image scan)
- `results/javascript.sarif` (CodeQL)

---

## 🚀 When Does the Pipeline Run?

The workflow triggers:
- On push to `main` or `security-pipeline`
- On pull request to those branches
- **Weekly:** Every Sunday at 00:00 UTC

---

## 📌 Requirements for Local Testing

If you want to test these tools locally:

```bash
# Install dependencies
npm install

# Run ESLint
npx eslint . --ext .js,.jsx,.ts,.tsx

# Install and run Trivy
brew install aquasecurity/trivy/trivy  # or use apt/yum
trivy fs .

# Run Gitleaks
gitleaks detect --source=. --report-format=json
