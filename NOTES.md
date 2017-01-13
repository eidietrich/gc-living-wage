# Gallatin County Cost of Living

Goal here: To create a web-calculator interface that explores the cost of living in the Bozeman area, pairs that against BLS data on typical wages


## Data sources:
- MIT Living wage estimates - http://livingwage.mit.edu/counties/30031
- BLS Occupational Employment and Wage Estimates for SW Montana - http://www.bls.gov/oes/current/oes_3000003.htm

County-specific numbers available in quarterly census of employment and wages (QCEW), looks like, though I'm not sure what the difference in the numbers is - See http://data.bls.gov/cew/apps/data_views/data_views.htm

## Tech stact
- Create react app + react-bootstrap

## References
- BLS API info http://www.bls.gov/developers/ (I'm currently just using a static downtload from SW Montana link above)
- BLS API Series ID formats - http://www.bls.gov/help/hlpforma.htm#OE

## TODO
- Download/scrape MIT Living wage estimates for particular county - set up a script to do this
- Decide: Calculator versus Stepped/scrolled story (start by building calculator, find a story, then set up narrative --> interactive)
- Change dropdown menu on profession selector to a link-based system
- Add toggle between annual and hourly rates?
- Think about ways to explain healthcare more
- Changes (after showing it to Troy) --> Retitle protective services, healthcare support. Figure out how to explain occupation labels more.

- Add popup to industry labels showing professions


## Outline:

Living expenses (include MIT typical value estimates, let users customize)
    Explain methodology
    By family size

Show, for given family size (1 Adult, 2 adults, 2 adults 2 children by default, but allow customization) --> 

What professions (and what median pay in particular professions) equates to a living wage

Try to estimate how many people in SW Montana are living below this living wage? (use QCEW stats to get GC-specific employment #s?)

Allow export as image for social media sharing? 

## Page structure:

(Start with a single family type, 1 adult)
1. GC living expenses (from MIT, expand to include methodology explanation), estimates - allow changes)
2. Living wage - single number.
3. By-profession list (start with by major category) of what income percentile within their profession workers have to be in to earn a living wage
    - Find a way to visualize how wage percentages compare to living wage?

Example:
Single adult needs a $21,570 living wage
--> Management occupations, A_PCT10 = $32,730, so more than 90% of managers make a living wage for a single adult.
--> 
...
--> Food service, A_MEDIAN=$19,360 & A_PCT75=$23,580, so between half and a quarter of food service workers make a living wage for a single adult

Logic: Take living wage, set bins by A10,A25,A50,A75,A90, figure out which bin living wage fits into --> return appropriate description

Components:
- Table
- Vertical visualization