BASE_MEAN = .3

BASE_STD = .25

VERY_HIGH_IMPACT = .15
HIGH_IMPACT = .08
LOW_IMPACT = .03

DATA_SOURCE_FACTROS = {
    "medical-records": HIGH_IMPACT,
    "family-history": HIGH_IMPACT,
    "lifestyle-habits": HIGH_IMPACT,
    "environmental-exposure": LOW_IMPACT,
    "insurance-claims": LOW_IMPACT,
    "occupational-hazard": LOW_IMPACT,
    "socioeconomic-indicators": LOW_IMPACT,
    "genomic-dna": VERY_HIGH_IMPACT,
    "chat-conversations": 0,
}
