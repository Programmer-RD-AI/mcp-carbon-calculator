PACKAGE_NAME := mcp-carbon-calculator
APP_DIR := src

install:
	uv sync

run:
	uv run python -m src.main

lint:
	uv run ruff check .

format:
	uv run ruff format .

clean:
	find . -type f -name "*.py[co]" -delete
	find . -type d -name "__pycache__" -delete
	rm -rf .pytest_cache .ruff_cache .mypy_cache build dist *.egg-info .coverage htmlcov *.log out/

build:
	docker build -t $(PACKAGE_NAME) .

# AWS Copilot commands
copilot-deploy:
	copilot svc deploy --env dev

copilot-status:
	copilot svc show

copilot-logs:
	copilot svc logs --name mcp-carbon-calc --env dev	
