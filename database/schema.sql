-- API Keys Management System Database Schema

-- Table for storing API keys
CREATE TABLE api_keys (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  api_key VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL,
  service VARCHAR(50) NOT NULL,
  status ENUM('active', 'expired', 'revoked') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_used TIMESTAMP NULL,
  user_id VARCHAR(36) NOT NULL
);

-- Table for storing API key permissions
CREATE TABLE api_key_permissions (
  id VARCHAR(36) PRIMARY KEY,
  api_key_id VARCHAR(36) NOT NULL,
  permission VARCHAR(50) NOT NULL,
  FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE CASCADE,
  UNIQUE KEY unique_key_permission (api_key_id, permission)
);

-- Table for storing API key usage logs
CREATE TABLE api_key_logs (
  id VARCHAR(36) PRIMARY KEY,
  api_key_id VARCHAR(36) NOT NULL,
  action VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45) NULL,
  user_agent TEXT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL,
  details TEXT NULL,
  FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_domain ON api_keys(domain);
CREATE INDEX idx_api_keys_service ON api_keys(service);
CREATE INDEX idx_api_keys_status ON api_keys(status);
CREATE INDEX idx_api_key_logs_timestamp ON api_key_logs(timestamp);

