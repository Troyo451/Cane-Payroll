# Supabase Schema – Cane Payroll

## Tables

### canecutters
| Field         | Type      | Description           |
|--------------|-----------|-----------------------|
| id           | uuid      | Primary key           |
| name         | text      | Cutter name           |
| ...          | ...       | ...                   |

### dailycuts (legacy)
| Field         | Type      | Description           |
|--------------|-----------|-----------------------|
| id           | uuid      | Primary key           |
| cutter_id    | uuid      | FK to canecutters     |
| ...          | ...       | ...                   |

### deductions
| Field         | Type      | Description           |
|--------------|-----------|-----------------------|
| id           | uuid      | Primary key           |
| cutter_id    | uuid      | FK to canecutters     |
| amount       | numeric   | Deduction amount      |
| ...          | ...       | ...                   |

### truck_loads
| Field         | Type      | Description           |
|--------------|-----------|-----------------------|
| id           | uuid      | Primary key           |
| date         | date      | Date of load          |
| mill_weight  | numeric   | Final mill weight     |
| ...          | ...       | ...                   |

### truck_cutters
| Field         | Type      | Description           |
|--------------|-----------|-----------------------|
| id           | uuid      | Primary key           |
| truck_id     | uuid      | FK to truck_loads     |
| cutter_id    | uuid      | FK to canecutters     |
| field_weight | numeric   | Field weight entered  |
| adj_weight   | numeric   | Adjusted (mill) weight|
| ...          | ...       | ...                   |

### config
| Field         | Type      | Description           |
|--------------|-----------|-----------------------|
| key          | text      | Config key            |
| value        | text      | Config value          |

---

## Relationships
- **truck_loads** 1—* **truck_cutters** (one load, many cutters)
- **canecutters** 1—* **truck_cutters** (one cutter, many loads)
- **deductions** links to **canecutters**

---

## RLS Policies
- All tables: RLS enabled, open policies for anon key (read/write for all)
- For production, review and restrict as needed

---

## Notes
- Adjusted weights are calculated after mill weight is entered by admin
- Config table stores app-wide variables
- See Supabase dashboard for full field definitions 