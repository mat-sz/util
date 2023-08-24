import { aton4, aton6, ntoa4, ntoa6 } from './ip.js';

describe('aton4', () => {
  it('should parse valid IPv4 addresses', () => {
    expect(aton4('11.11.11.11')).toEqual(185273099);
    expect(aton4('1.1.1.1')).toEqual(16843009);
    expect(aton4('0.0.0.0')).toEqual(0);
  });

  it('should return undefined on invalid IPv4 addresses', () => {
    expect(aton4('-1.0.-1.0')).toBeUndefined();
    expect(aton4('-')).toBeUndefined();
    expect(aton4('0.0.0')).toBeUndefined();
  });
});

describe('ntoa4', () => {
  it('should return valid IPv4 addresses', () => {
    expect(ntoa4(aton4('127.0.0.1'))).toEqual('127.0.0.1');
  });

  it('should return undefined if input is undefined', () => {
    expect(ntoa4(undefined)).toBeUndefined();
  });
});

describe('aton6', () => {
  it('should parse valid IPv6 addresses', () => {
    expect(aton6('ff02::0001')).toEqual(
      338963523518870617245727861364146307073n,
    );
    expect(aton6('fe80::a299:9bff:fe18:50d1')).toEqual(
      338288524927261089665735464270710722769n,
    );
    expect(aton6('0:0:0:0:0:0:0:0')).toEqual(0n);
  });

  it('should return undefined on invalid IPv6 addresses', () => {
    expect(aton6('ff00::')).toBeUndefined();
    expect(aton6('-')).toBeUndefined();
    expect(aton6('1.2.3.4')).toBeUndefined();
  });
});

describe('ntoa6', () => {
  it('should return valid full addresses', () => {
    expect(ntoa6(aton6('ff02::1'), true)).toEqual(
      'ff02:0000:0000:0000:0000:0000:0000:0001',
    );
  });

  it('should return valid short addresses', () => {
    expect(ntoa6(aton6('0000:0000:0000:0000:0000:0000:0000:0000'))).toEqual(
      '::',
    );

    expect(ntoa6(aton6('0000:0000:0000:0000:0000:0000:0000:0001'))).toEqual(
      '::1',
    );

    expect(ntoa6(aton6('ff02:0000:0000:0000:0000:0000:0000:0001'))).toEqual(
      'ff02::1',
    );

    expect(ntoa6(aton6('fe80:0000:0000:0000:a299:9bff:fe18:50d1'))).toEqual(
      'fe80::a299:9bff:fe18:50d1',
    );

    expect(ntoa6(aton6('ff02:0000:0000:0000:0000:0000:0000:0000'))).toEqual(
      'ff02::0',
    );
  });
});
