# EKS Secure CI/CD Pipeline 🚀

This project demonstrates a **secure and automated CI/CD pipeline** to deploy microservices on **Amazon EKS** using:
- Jenkins for orchestration
- SonarQube for code quality checks
- Trivy for vulnerability scanning
- Amazon ECR for container registry
- Grafana (with Prometheus) for monitoring

---

## ✅ Features

- 🔁 Fully automated CI/CD pipeline
- 🔐 Integrated vulnerability scanning with **Trivy**
- 🧪 Code analysis using **SonarQube**
- 📦 Secure image push to **Amazon ECR**
- 🚢 Deployment to **EKS** (via kubectl or Helm)
- 📈 Monitoring with **Prometheus + Grafana**
- 📣 Mail alerts (optional)

---

## 📌 Architecture

GitHub → Jenkins → SonarQube → Trivy → ECR → EKS → Prometheus → Grafana

---

## 🧰 Tech Stack

| Tool         | Purpose                               |
|--------------|---------------------------------------|
| Jenkins      | CI/CD automation                      |
| SonarQube    | Code quality & static analysis        |
| Trivy        | Container image vulnerability scanner |
| Amazon ECR   | Secure container registry             |
| EKS          | Kubernetes on AWS                     |
| Prometheus   | Metrics collection                    |
| Grafana      | Monitoring and visualization          |
| Slack (opt)  | Alerts and notifications              |

---

## 🔄 CI/CD Pipeline Flow

1. ✅ **Code Push** to GitHub triggers Jenkins.
2. 🔍 **SonarQube Scan** for code quality.
3. 🛡️ **Trivy Scan** for image vulnerabilities.
4. 🐳 **Docker Build** and push to **Amazon ECR**.
5. 🚀 **Deploy** to **EKS** via `kubectl` or Helm.
6. 📊 **Prometheus scrapes** app + node metrics.
7. 📉 **Grafana** displays dashboards.
8. 🔔 **Slack alerts** on failures or anomalies.


---

## 🚀 Getting Started

### Prerequisites

- AWS CLI configured
- EKS cluster running
- Jenkins installed (on EC2 or container)
- Docker installed
- Prometheus + Grafana (optional on EC2 or EKS)
- Amazon ECR repository created
- SonarQube and Trivy set up (locally or on EC2)

---

### Setup Instructions

1. **Clone the Repo**
2. **Configure Jenkins Credentials**

- AWS Credentials for ECR push

- GitHub token (if private)

- SonarQube token

- EKS kubeconfig in Jenkins environment

3. **Create a Jenkins Pipeline Job**

- Use the provided Jenkinsfile

- Customize the ECR repo and image name

4. **Push Code to Trigger the Pipeline**

---

## 🔍 Security with Trivy
### Trivy scans the Docker image for OS vulnerabilities and misconfigurations
### Report is saved in trivy-reports/ and published in Jenkins
### Pipeline can break on CRITICAL vulnerabilities (configurable)

---

## 📦 Amazon ECR Integration
Docker images are tagged and securely pushed to your private ECR repo
AWS CLI + Jenkins IAM role or access keys handle authentication

---

## 📈 Monitoring with Grafana
### Prometheus scrapes:
- Node metrics
- Pod/container metrics
- Jenkins (via Prometheus plugin)

### Grafana dashboards:
- Jenkins Health
- Pod CPU/Memory
- Deployment status

---

🧑‍💻 Author
Dinesh M
DevOps Engineer

---

📜 License
This project is licensed under the MIT License.
