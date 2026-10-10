import {
  maskProtectedTerms,
  restoreProtectedTerms,
  translateAroundProtectedTerms,
  polishAcademicThai,
} from './subtitle-glossary.util';

describe('subtitle translation glossary', () => {
  it('protects the literary title and ODC regardless of case', () => {
    const text = 'I do not know what happened in the divine comedy. We read the ODC.';
    const protectedInput = maskProtectedTerms(text, text);
    expect(protectedInput.masked).toContain('ZXQNAME0ZXQ');
    expect(protectedInput.masked).toContain('ZXQNAME1ZXQ');
    expect(restoreProtectedTerms(
      'ไม่รู้ว่าเกิดอะไรขึ้นใน ZXQNAME0ZXQ และเราอ่าน ZXQNAME1ZXQ',
      protectedInput.terms,
    )).toBe('ไม่รู้ว่าเกิดอะไรขึ้นใน The Divine Comedy และเราอ่าน ODC');
  });

  it('maps assignment to homework only in educational context', () => {
    expect(maskProtectedTerms('an assignment.', 'we had to read the ODC').terms)
      .toEqual([{ source: 'assignment', canonical: 'การบ้าน' }]);
    expect(maskProtectedTerms('assignment.', 'deployment of application').terms).toEqual([]);
    expect(polishAcademicThai(
      'แต่ฉันจำได้ว่ามันเหมือนกับการสั่งงาน',
      'But I remember it was like an assignment.',
      'we had to read the ODC',
    )).toBe('แต่ฉันจำได้ว่ามันเหมือนจะเป็นการบ้าน');
  });

  it('falls back safely if MADLAD deletes placeholders', async () => {
    const original = 'what happened in the divine comedy.';
    const masked = maskProtectedTerms(original, original);
    expect(restoreProtectedTerms('เกิดอะไรขึ้นในละครตลก', masked.terms)).toBeNull();
    const fallback = await translateAroundProtectedTerms(original, masked.terms, async (part) =>
      part.includes('what happened') ? 'เกิดอะไรขึ้นใน' : part,
    );
    expect(fallback).toBe('เกิดอะไรขึ้นใน The Divine Comedy.');
  });
});
